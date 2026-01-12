-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role-based access control
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create site_content table for CMS
CREATE TABLE public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_key TEXT NOT NULL,
    section_key TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (page_key, section_key)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site content is viewable by everyone"
ON public.site_content FOR SELECT
USING (true);

CREATE POLICY "Admins can manage site content"
ON public.site_content FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create media_library table
CREATE TABLE public.media_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER,
    alt_text TEXT,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media is viewable by everyone"
ON public.media_library FOR SELECT
USING (true);

CREATE POLICY "Admins can manage media"
ON public.media_library FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create blog_posts table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_id UUID REFERENCES auth.users(id),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are viewable by everyone"
ON public.blog_posts FOR SELECT
USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact forms"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view and manage submissions"
ON public.contact_submissions FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create seo_settings table
CREATE TABLE public.seo_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_path TEXT NOT NULL UNIQUE,
    title TEXT,
    description TEXT,
    og_image TEXT,
    keywords TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SEO settings are viewable by everyone"
ON public.seo_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage SEO settings"
ON public.seo_settings FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create projects table for portfolio
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT,
    full_description TEXT,
    image_url TEXT,
    gallery JSONB DEFAULT '[]',
    technologies TEXT[],
    client_name TEXT,
    project_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
ON public.projects FOR SELECT
USING (true);

CREATE POLICY "Admins can manage projects"
ON public.projects FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_content_updated_at
    BEFORE UPDATE ON public.site_content
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_settings_updated_at
    BEFORE UPDATE ON public.seo_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Storage policies
CREATE POLICY "Media files are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY "Admins can upload media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete media"
ON storage.objects FOR DELETE
USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));