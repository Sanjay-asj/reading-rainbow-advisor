
import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import BookCarousel from "@/components/BookCarousel";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

// Mock data for the prototype
const featuredBooks = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
    rating: 4,
    genre: "Fiction"
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
    rating: 5,
    genre: "Sci-Fi"
  },
  {
    id: "3",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg",
    rating: 4,
    genre: "Literary"
  },
  {
    id: "4",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582135294i/36809135.jpg",
    rating: 4,
    genre: "Fiction"
  },
  {
    id: "5",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1331154660i/11250317.jpg",
    rating: 5,
    genre: "Historical"
  },
  {
    id: "6",
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg",
    rating: 5,
    genre: "Self-Help"
  }
];

const newReleases = [
  {
    id: "7",
    title: "The Last Thing He Told Me",
    author: "Laura Dave",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1628623381i/58746117.jpg",
    rating: 4,
    genre: "Mystery"
  },
  {
    id: "8",
    title: "Four Thousand Weeks",
    author: "Oliver Burkeman",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1612287905i/54785515.jpg",
    rating: 5,
    genre: "Productivity"
  },
  {
    id: "9",
    title: "The Lincoln Highway",
    author: "Amor Towles",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1618329605i/57109107.jpg",
    rating: 4,
    genre: "Historical"
  },
  {
    id: "10",
    title: "Empire of Pain",
    author: "Patrick Radden Keefe",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1611952534i/43868109.jpg",
    rating: 5,
    genre: "Non-Fiction"
  }
];

const genreRecommendations = [
  {
    id: "11",
    title: "Educated",
    author: "Tara Westover",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg",
    rating: 5,
    genre: "Memoir"
  },
  {
    id: "12",
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1459524472i/29430012.jpg",
    rating: 4,
    genre: "Historical"
  },
  {
    id: "13",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420585954i/23692271.jpg",
    rating: 5,
    genre: "Non-Fiction"
  },
  {
    id: "14",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782036i/40097951.jpg",
    rating: 4,
    genre: "Thriller"
  }
];

const Index = () => {
  const [userPreferences, setUserPreferences] = useState<string[]>([]);
  const [showPreferencePrompt, setShowPreferencePrompt] = useState(true);
  
  useEffect(() => {
    // Check if user has set preferences before
    const savedPreferences = localStorage.getItem('bookPreferences');
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
      setShowPreferencePrompt(false);
    }
  }, []);
  
  const genres = ["Mystery", "Fiction", "Sci-Fi", "Fantasy", "Romance", "Historical", "Non-Fiction", "Thriller", "Self-Help", "Memoir"];
  
  const handleGenreToggle = (genre: string) => {
    setUserPreferences(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };
  
  const savePreferences = () => {
    localStorage.setItem('bookPreferences', JSON.stringify(userPreferences));
    setShowPreferencePrompt(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-6 px-4">
        {/* Hero Section */}
        <section className="relative rounded-xl bg-book-cream mb-10 p-6 sm:p-10">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
              Discover Your Next Great Read
            </h1>
            <p className="text-lg mb-6">
              Personalized book recommendations based on your reading preferences and history.
            </p>
            <Button className="bg-book-navy hover:bg-book-navy/90 text-white">
              <BookOpen className="mr-2 h-4 w-4" />
              Start Exploring
            </Button>
          </div>
          <div className="hidden lg:block absolute right-10 top-1/2 transform -translate-y-1/2 -rotate-6">
            <div className="relative w-48 h-64 shadow-xl">
              <img 
                src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg" 
                alt="Featured Book" 
                className="absolute inset-0 w-full h-full object-cover rounded"
              />
            </div>
          </div>
        </section>
        
        {/* Preference Collection */}
        {showPreferencePrompt && (
          <section className="bg-white border rounded-xl p-6 mb-10 shadow-sm">
            <h2 className="text-xl font-heading font-semibold mb-4">Tell us what you like to read</h2>
            <p className="text-muted-foreground mb-6">Select your favorite genres for personalized recommendations:</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {genres.map(genre => (
                <Button
                  key={genre}
                  variant={userPreferences.includes(genre) ? "default" : "outline"}
                  className={userPreferences.includes(genre) ? "bg-book-accent" : ""}
                  onClick={() => handleGenreToggle(genre)}
                >
                  {genre}
                </Button>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={savePreferences} 
                disabled={userPreferences.length === 0}
                className="bg-book-navy hover:bg-book-navy/90 text-white"
              >
                Save Preferences
              </Button>
            </div>
          </section>
        )}
        
        {/* Featured Books */}
        <section className="mb-12">
          <BookCarousel title="Featured Books" description="Top-rated books our readers love">
            {featuredBooks.map((book) => (
              <div key={book.id} className="flex-none w-[160px] md:w-[200px] snap-start">
                <BookCard {...book} />
              </div>
            ))}
          </BookCarousel>
        </section>
        
        {/* New Releases */}
        <section className="mb-12">
          <BookCarousel title="New Releases" description="Hot off the press">
            {newReleases.map((book) => (
              <div key={book.id} className="flex-none w-[160px] md:w-[200px] snap-start">
                <BookCard {...book} />
              </div>
            ))}
          </BookCarousel>
        </section>
        
        {/* Based on Preferences */}
        {!showPreferencePrompt && userPreferences.length > 0 && (
          <section className="mb-12">
            <BookCarousel title="Recommended for You" description={`Based on your interest in ${userPreferences.slice(0, 3).join(', ')}${userPreferences.length > 3 ? '...' : ''}`}>
              {genreRecommendations.map((book) => (
                <div key={book.id} className="flex-none w-[160px] md:w-[200px] snap-start">
                  <BookCard {...book} />
                </div>
              ))}
            </BookCarousel>
          </section>
        )}
      </main>
      
      <footer className="border-t py-6 bg-book-paper">
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

export default Index;
