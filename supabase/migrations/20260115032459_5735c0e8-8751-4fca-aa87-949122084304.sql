-- Create site_settings table for global settings (social links, brand info, etc.)
CREATE TABLE public.site_settings (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key text NOT NULL UNIQUE,
    setting_value jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policies for site_settings
CREATE POLICY "Site settings are viewable by everyone" 
ON public.site_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage site settings" 
ON public.site_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create customer_reviews table
CREATE TABLE public.customer_reviews (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name text NOT NULL,
    customer_title text,
    customer_company text,
    customer_image text,
    review_text text NOT NULL,
    rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_featured boolean DEFAULT false,
    display_order integer DEFAULT 0,
    is_published boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

-- Policies for customer_reviews
CREATE POLICY "Published reviews are viewable by everyone" 
ON public.customer_reviews 
FOR SELECT 
USING (is_published = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage reviews" 
ON public.customer_reviews 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create page_visits table for analytics
CREATE TABLE public.page_visits (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path text NOT NULL,
    visitor_id text,
    referrer text,
    user_agent text,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;

-- Anyone can insert page visits (for tracking)
CREATE POLICY "Anyone can insert page visits" 
ON public.page_visits 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view analytics
CREATE POLICY "Admins can view page visits" 
ON public.page_visits 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create services table
CREATE TABLE public.services (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text,
    icon text,
    features jsonb DEFAULT '[]'::jsonb,
    display_order integer DEFAULT 0,
    is_featured boolean DEFAULT false,
    is_published boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Policies for services
CREATE POLICY "Published services are viewable by everyone" 
ON public.services 
FOR SELECT 
USING (is_published = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage services" 
ON public.services 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create team_members table
CREATE TABLE public.team_members (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    role text,
    bio text,
    image_url text,
    social_links jsonb DEFAULT '{}'::jsonb,
    display_order integer DEFAULT 0,
    is_published boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Policies for team_members
CREATE POLICY "Published team members are viewable by everyone" 
ON public.team_members 
FOR SELECT 
USING (is_published = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage team members" 
ON public.team_members 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customer_reviews_updated_at
BEFORE UPDATE ON public.customer_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value) VALUES
('brand', '{"name": "SAKO", "tagline": "We craft exceptional digital experiences that transform businesses and captivate audiences.", "logo_url": ""}'::jsonb),
('social_links', '{"twitter": "#", "github": "#", "linkedin": "#", "instagram": "#", "facebook": "#", "youtube": "#"}'::jsonb),
('contact_info', '{"email": "hello@sako.agency", "phone": "+1 (555) 123-4567", "address": "123 Creative Street, Design District, NY 10001"}'::jsonb),
('footer', '{"copyright": "© 2024 SAKO Agency. All rights reserved.", "terms_url": "#", "privacy_url": "#", "cookies_url": "#"}'::jsonb);