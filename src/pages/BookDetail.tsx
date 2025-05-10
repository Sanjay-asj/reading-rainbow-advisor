
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const mockBooks = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
    rating: 4,
    genre: "Fiction",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
    pages: 304,
    published: "August 13, 2020",
    publisher: "Canongate Books",
    isbn: "9781786892737",
    tags: ["Contemporary", "Fantasy", "Fiction", "Mental Health"]
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
    rating: 5,
    genre: "Sci-Fi",
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it. All he knows is that he's been asleep for a very, very long time. And he's just been awakened to find himself millions of miles from home, with nothing but two corpses for company.",
    pages: 496,
    published: "May 4, 2021",
    publisher: "Ballantine Books",
    isbn: "9780593135204",
    tags: ["Science Fiction", "Space", "Adventure"]
  }
];

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [readStatus, setReadStatus] = useState<'want-to-read' | 'reading' | 'read' | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchBook = () => {
      setLoading(true);
      const foundBook = mockBooks.find(b => b.id === id);
      
      // Simulate loading
      setTimeout(() => {
        setBook(foundBook || null);
        
        // Check if user has this book in their list
        const savedStatus = localStorage.getItem(`book-${id}-status`);
        if (savedStatus) {
          setReadStatus(savedStatus as any);
        }
        
        setLoading(false);
      }, 500);
    };
    
    fetchBook();
  }, [id]);
  
  const handleStatusChange = (status: 'want-to-read' | 'reading' | 'read') => {
    setReadStatus(status);
    localStorage.setItem(`book-${id}-status`, status);
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container py-10 px-4">
          <div className="animate-pulse">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-48 h-72 bg-muted rounded"></div>
              <div className="flex-1">
                <div className="h-10 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-muted rounded w-1/4 mb-8"></div>
                <div className="h-4 bg-muted rounded w-full mb-3"></div>
                <div className="h-4 bg-muted rounded w-full mb-3"></div>
                <div className="h-4 bg-muted rounded w-4/5 mb-3"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container py-10 px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-heading font-bold mb-2">Book Not Found</h1>
            <p className="text-muted-foreground mb-6">We couldn't find the book you're looking for.</p>
            <Button asChild>
              <a href="/">Return Home</a>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Cover */}
          <div className="md:sticky md:top-20 self-start">
            <div className="w-48 h-auto shadow-lg rounded overflow-hidden">
              <img
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex flex-col gap-3 w-48">
              <Button
                variant={readStatus === 'want-to-read' ? "default" : "outline"}
                className={`w-full ${readStatus === 'want-to-read' ? 'bg-book-accent' : ''}`}
                onClick={() => handleStatusChange('want-to-read')}
              >
                Want to Read
              </Button>
              <Button
                variant={readStatus === 'reading' ? "default" : "outline"}
                className={`w-full ${readStatus === 'reading' ? 'bg-book-accent' : ''}`}
                onClick={() => handleStatusChange('reading')}
              >
                Currently Reading
              </Button>
              <Button
                variant={readStatus === 'read' ? "default" : "outline"}
                className={`w-full ${readStatus === 'read' ? 'bg-book-accent' : ''}`}
                onClick={() => handleStatusChange('read')}
              >
                Read
              </Button>
            </div>
          </div>
          
          {/* Book Details */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              {book.title}
            </h1>
            <h2 className="text-xl text-muted-foreground mb-4">
              by {book.author}
            </h2>
            
            {/* Ratings and Genres */}
            <div className="flex items-center flex-wrap gap-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-xl ${i < book.rating ? 'text-book-gold' : 'text-muted'}`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-muted-foreground">{book.rating}/5</span>
              </div>
              
              <Separator orientation="vertical" className="h-6" />
              
              <Badge variant="outline" className="bg-book-paper">{book.genre}</Badge>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-heading font-semibold mb-3">Description</h3>
              <p className="text-base leading-relaxed">{book.description}</p>
            </div>
            
            {/* Book Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mb-8">
              <div>
                <p className="text-sm text-muted-foreground">Pages</p>
                <p>{book.pages}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p>{book.published}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Publisher</p>
                <p>{book.publisher}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ISBN</p>
                <p>{book.isbn}</p>
              </div>
            </div>
            
            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-xl font-heading font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
            
            {/* Similar Books Placeholder */}
            <div>
              <h3 className="text-xl font-heading font-semibold mb-3">You might also like</h3>
              <p className="text-muted-foreground">
                Similar book recommendations will appear here based on your reading habits.
              </p>
            </div>
          </div>
        </div>
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

export default BookDetail;
