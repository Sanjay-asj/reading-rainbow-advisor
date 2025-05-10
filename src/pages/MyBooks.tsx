
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data of books
const allBooks = [
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
  },
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
  }
];

const MyBooks = () => {
  const [wantToRead, setWantToRead] = useState<any[]>([]);
  const [reading, setReading] = useState<any[]>([]);
  const [read, setRead] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from a user's data API
    // For demo, we'll check localStorage for book statuses
    const loadBooks = () => {
      const wantToReadList: any[] = [];
      const readingList: any[] = [];
      const readList: any[] = [];
      
      allBooks.forEach(book => {
        const status = localStorage.getItem(`book-${book.id}-status`);
        if (status === 'want-to-read') {
          wantToReadList.push(book);
        } else if (status === 'reading') {
          readingList.push(book);
        } else if (status === 'read') {
          readList.push(book);
        }
      });
      
      setWantToRead(wantToReadList);
      setReading(readingList);
      setRead(readList);
    };
    
    loadBooks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">My Books</h1>
          <p className="text-muted-foreground">Keep track of what you've read, what you're reading, and what you want to read next.</p>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="want-to-read">Want to Read ({wantToRead.length})</TabsTrigger>
            <TabsTrigger value="reading">Reading ({reading.length})</TabsTrigger>
            <TabsTrigger value="read">Read ({read.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="space-y-8">
              {wantToRead.length > 0 && (
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Want to Read</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {wantToRead.map((book) => (
                      <BookCard key={`want-${book.id}`} {...book} />
                    ))}
                  </div>
                </section>
              )}
              
              {reading.length > 0 && (
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Currently Reading</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {reading.map((book) => (
                      <BookCard key={`reading-${book.id}`} {...book} />
                    ))}
                  </div>
                </section>
              )}
              
              {read.length > 0 && (
                <section>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Read</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {read.map((book) => (
                      <BookCard key={`read-${book.id}`} {...book} />
                    ))}
                  </div>
                </section>
              )}
              
              {wantToRead.length === 0 && reading.length === 0 && read.length === 0 && (
                <div className="text-center py-16 bg-book-paper rounded-lg">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-2xl font-heading font-semibold mb-2">Your bookshelf is empty</h2>
                  <p className="text-muted-foreground mb-6">Start adding books to your collection</p>
                  <Button asChild>
                    <Link to="/">Discover Books</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="want-to-read">
            {wantToRead.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {wantToRead.map((book) => (
                  <BookCard key={`want-tab-${book.id}`} {...book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-book-paper rounded-lg">
                <h2 className="text-xl font-heading font-semibold mb-2">No books on your "Want to Read" list yet</h2>
                <Button asChild className="mt-4">
                  <Link to="/">Find Books</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reading">
            {reading.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {reading.map((book) => (
                  <BookCard key={`reading-tab-${book.id}`} {...book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-book-paper rounded-lg">
                <h2 className="text-xl font-heading font-semibold mb-2">You're not currently reading any books</h2>
                <Button asChild className="mt-4">
                  <Link to="/">Start Reading</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="read">
            {read.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {read.map((book) => (
                  <BookCard key={`read-tab-${book.id}`} {...book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-book-paper rounded-lg">
                <h2 className="text-xl font-heading font-semibold mb-2">You haven't finished any books yet</h2>
                <Button asChild className="mt-4">
                  <Link to="/">Discover Books</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
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

export default MyBooks;
