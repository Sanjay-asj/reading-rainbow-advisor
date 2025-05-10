
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { BookOpen, User } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: localStorage.getItem("user-name") || "",
    email: localStorage.getItem("user-email") || "",
    bio: localStorage.getItem("user-bio") || "",
    favoriteGenres: (localStorage.getItem("user-favorite-genres") || "Fiction, Mystery, Sci-Fi").split(", "),
    profilePicture: localStorage.getItem("user-profile-picture") || "https://i.pravatar.cc/300"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleGenresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genres = e.target.value.split(",").map(g => g.trim()).filter(Boolean);
    setProfile(prev => ({
      ...prev,
      favoriteGenres: genres
    }));
  };
  
  const saveProfile = () => {
    // In a real app, this would be an API call
    localStorage.setItem("user-name", profile.name);
    localStorage.setItem("user-email", profile.email);
    localStorage.setItem("user-bio", profile.bio);
    localStorage.setItem("user-favorite-genres", profile.favoriteGenres.join(", "));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    
    setIsEditing(false);
  };
  
  // Mock reading stats
  const readingStats = {
    booksRead: parseInt(localStorage.getItem("stats-books-read") || "12"),
    pagesRead: parseInt(localStorage.getItem("stats-pages-read") || "3240"),
    avgRating: parseFloat(localStorage.getItem("stats-avg-rating") || "4.2"),
    readingStreak: parseInt(localStorage.getItem("stats-reading-streak") || "5")
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-book-paper">
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-heading font-bold mb-2">{profile.name || "Book Lover"}</h1>
              <p className="text-muted-foreground mb-4">{profile.email || "booklover@example.com"}</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {profile.favoriteGenres.map((genre, index) => (
                  <span key={index} className="bg-book-paper px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="stats">Reading Stats</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              {isEditing ? (
                <div className="space-y-6 bg-white p-6 rounded-lg border">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="genres">Favorite Genres (comma-separated)</Label>
                    <Input
                      id="genres"
                      name="genres"
                      value={profile.favoriteGenres.join(", ")}
                      onChange={handleGenresChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={saveProfile}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="bg-white p-6 rounded-lg border mb-6">
                    <h2 className="text-xl font-heading font-semibold mb-4">About Me</h2>
                    <p className="mb-4">{profile.bio || "No bio provided yet. Edit your profile to add a bio!"}</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-heading font-semibold mb-4">Reading Preferences</h2>
                    <div>
                      <h3 className="font-medium mb-2">Favorite Genres:</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.favoriteGenres.map((genre, index) => (
                          <span key={index} className="bg-book-paper px-3 py-1 rounded-full text-sm">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-heading font-semibold mb-6">Your Reading Stats</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-book-paper p-4 rounded-lg text-center">
                    <p className="text-muted-foreground mb-1">Books Read</p>
                    <p className="text-3xl font-heading font-bold">{readingStats.booksRead}</p>
                  </div>
                  
                  <div className="bg-book-paper p-4 rounded-lg text-center">
                    <p className="text-muted-foreground mb-1">Pages Read</p>
                    <p className="text-3xl font-heading font-bold">{readingStats.pagesRead}</p>
                  </div>
                  
                  <div className="bg-book-paper p-4 rounded-lg text-center">
                    <p className="text-muted-foreground mb-1">Avg. Rating</p>
                    <p className="text-3xl font-heading font-bold">{readingStats.avgRating}</p>
                  </div>
                  
                  <div className="bg-book-paper p-4 rounded-lg text-center">
                    <p className="text-muted-foreground mb-1">Reading Streak</p>
                    <p className="text-3xl font-heading font-bold">{readingStats.readingStreak} days</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-muted-foreground">
                    Reading stats are updated as you add books to your "Read" collection.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-heading font-semibold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notification-recommendations"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="notification-recommendations">
                          Book Recommendations
                        </Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notification-reading-reminders"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="notification-reading-reminders">
                          Reading Reminders
                        </Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notification-newsletter"
                          className="mr-2"
                        />
                        <Label htmlFor="notification-newsletter">
                          Monthly Newsletter
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Privacy</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="privacy-public-profile"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="privacy-public-profile">
                          Public Profile
                        </Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="privacy-reading-activity"
                          className="mr-2"
                          defaultChecked
                        />
                        <Label htmlFor="privacy-reading-activity">
                          Share Reading Activity
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      onClick={() => {
                        toast({
                          title: "Settings saved",
                          description: "Your account settings have been updated."
                        });
                      }}
                    >
                      Save Settings
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t py-6 bg-book-paper mt-10">
        <div className="container flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <BookOpen className="h-6 w-6 text-book-navy" />
            <span className="font-heading font-bold">Bookshelf</span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Bookshelf. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
