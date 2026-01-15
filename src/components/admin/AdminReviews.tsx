import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Star, Quote } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Review = Tables<"customer_reviews">;

export function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_title: "",
    customer_company: "",
    customer_image: "",
    review_text: "",
    rating: 5,
    is_featured: false,
    is_published: true,
    display_order: 0
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("customer_reviews")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast({ title: "Error", description: "Failed to load reviews", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingReview) {
        const { error } = await supabase
          .from("customer_reviews")
          .update(formData)
          .eq("id", editingReview.id);
        if (error) throw error;
        toast({ title: "Success", description: "Review updated successfully" });
      } else {
        const { error } = await supabase
          .from("customer_reviews")
          .insert([formData]);
        if (error) throw error;
        toast({ title: "Success", description: "Review added successfully" });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchReviews();
    } catch (error) {
      console.error("Error saving review:", error);
      toast({ title: "Error", description: "Failed to save review", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const { error } = await supabase
        .from("customer_reviews")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Review deleted" });
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast({ title: "Error", description: "Failed to delete review", variant: "destructive" });
    }
  };

  const openEditDialog = (review: Review) => {
    setEditingReview(review);
    setFormData({
      customer_name: review.customer_name,
      customer_title: review.customer_title || "",
      customer_company: review.customer_company || "",
      customer_image: review.customer_image || "",
      review_text: review.review_text,
      rating: review.rating,
      is_featured: review.is_featured || false,
      is_published: review.is_published ?? true,
      display_order: review.display_order || 0
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingReview(null);
    setFormData({
      customer_name: "",
      customer_title: "",
      customer_company: "",
      customer_image: "",
      review_text: "",
      rating: 5,
      is_featured: false,
      is_published: true,
      display_order: 0
    });
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
    ));
  };

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold">Customer Reviews</h2>
          <p className="text-muted-foreground">Manage testimonials and customer feedback</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Add Review</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingReview ? "Edit Review" : "Add New Review"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Customer Name *</Label>
                  <Input
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label>Title/Role</Label>
                  <Input
                    value={formData.customer_title}
                    onChange={(e) => setFormData({ ...formData, customer_title: e.target.value })}
                    placeholder="CEO"
                  />
                </div>
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={formData.customer_company}
                  onChange={(e) => setFormData({ ...formData, customer_company: e.target.value })}
                  placeholder="Acme Inc."
                />
              </div>
              <div>
                <Label>Customer Image URL</Label>
                <Input
                  value={formData.customer_image}
                  onChange={(e) => setFormData({ ...formData, customer_image: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <div>
                <Label>Review Text *</Label>
                <Textarea
                  value={formData.review_text}
                  onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                  placeholder="Their feedback about your services..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Rating</Label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>{num} Stars</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label>Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label>Published</Label>
                </div>
              </div>
              <Button onClick={handleSubmit} disabled={!formData.customer_name || !formData.review_text}>
                {editingReview ? "Update Review" : "Add Review"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No reviews yet. Add your first customer review!
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className={`bg-card border rounded-xl p-6 ${review.is_featured ? "border-primary" : "border-border"}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {review.customer_image ? (
                    <img
                      src={review.customer_image}
                      alt={review.customer_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Quote className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{review.customer_name}</h3>
                      {review.is_featured && (
                        <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">Featured</span>
                      )}
                      {!review.is_published && (
                        <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">Draft</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.customer_title}{review.customer_company && ` at ${review.customer_company}`}
                    </p>
                    <div className="flex items-center gap-1 mt-1">{renderStars(review.rating)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(review)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(review.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground italic">"{review.review_text}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
