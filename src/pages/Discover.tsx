import { useState } from "react";
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock book data
const allBooks = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
    rating: 4,
    genre: "Fiction",
    year: 2020,
    tags: ["Contemporary", "Fantasy", "Fiction", "Mental Health"]
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg",
    rating: 5,
    genre: "Sci-Fi",
    year: 2021,
    tags: ["Science Fiction", "Space", "Adventure"]
  },
  {
    id: "3",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg",
    rating: 4,
    genre: "Literary",
    year: 2021,
    tags: ["Science Fiction", "Literary Fiction", "Dystopian"]
  },
  {
    id: "4",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582135294i/36809135.jpg",
    rating: 4,
    genre: "Fiction",
    year: 2018,
    tags: ["Mystery", "Historical Fiction", "Coming of Age"]
  },
  {
    id: "5",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1331154660i/11250317.jpg",
    rating: 5,
    genre: "Historical",
    year: 2012,
    tags: ["Historical Fiction", "Mythology", "LGBT"]
  },
  {
    id: "6",
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg",
    rating: 5,
    genre: "Self-Help",
    year: 2018,
    tags: ["Self Help", "Productivity", "Psychology"]
  },
  {
    id: "7",
    title: "The Last Thing He Told Me",
    author: "Laura Dave",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1628623381i/58746117.jpg",
    rating: 4,
    genre: "Mystery",
    year: 2021,
    tags: ["Mystery", "Thriller", "Fiction"]
  },
  {
    id: "8",
    title: "Four Thousand Weeks",
    author: "Oliver Burkeman",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1612287905i/54785515.jpg",
    rating: 5,
    genre: "Productivity",
    year: 2021,
    tags: ["Self Help", "Productivity", "Philosophy"]
  },
  {
    id: "9",
    title: "The Lincoln Highway",
    author: "Amor Towles",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1618329605i/57109107.jpg",
    rating: 4,
    genre: "Historical",
    year: 2021,
    tags: ["Historical Fiction", "Literary Fiction"]
  },
  {
    id: "10",
    title: "Empire of Pain",
    author: "Patrick Radden Keefe",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1611952534i/43868109.jpg",
    rating: 5,
    genre: "Non-Fiction",
    year: 2021,
    tags: ["Non Fiction", "History", "Biography"]
  },
  {
    id: "11",
    title: "Educated",
    author: "Tara Westover",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg",
    rating: 5,
    genre: "Memoir",
    year: 2018,
    tags: ["Memoir", "Biography", "Non Fiction"]
  },
  {
    id: "12",
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1459524472i/29430012.jpg",
    rating: 4,
    genre: "Historical",
    year: 2016,
    tags: ["Historical Fiction", "Russia", "Literary Fiction"]
  }
];

// Available genres
const genres = [
  "All Genres",
  "Fiction",
  "Sci-Fi",
  "Literary",
  "Historical",
  "Mystery",
  "Self-Help",
  "Productivity",
  "Non-Fiction",
  "Memoir"
];

// Available tags for filtering
const availableTags = Array.from(
  new Set(allBooks.flatMap(book => book.tags))
).sort();

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("relevance");
  
  // Filter books based on search criteria
  const filteredBooks = allBooks.filter(book => {
    // Text search
    const searchMatch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Genre filter
    const genreMatch = selectedGenre === "All Genres" || book.genre === selectedGenre;
    
    // Rating filter
    const ratingMatch = book.rating >= minRating;
    
    // Tags filter
    const tagsMatch = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => book.tags.includes(tag));
    
    return searchMatch && genreMatch && ratingMatch && tagsMatch;
  });
  
  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "rating-desc") {
      return b.rating - a.rating;
    } else if (sortOption === "rating-asc") {
      return a.rating - b.rating;
    } else if (sortOption === "year-desc") {
      return b.year - a.year;
    } else if (sortOption === "year-asc") {
      return a.year - b.year;
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "author") {
      return a.author.localeCompare(b.author);
    }
    // For relevance or any other option, keep original order
    return 0;
  });
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("All Genres");
    setSelectedTags([]);
    setMinRating(0);
    setSortOption("relevance");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8 px-4">
        <h1 className="text-3xl font-heading font-bold mb-2">Discover Books</h1>
        <p className="text-muted-foreground mb-8">Explore and find your next favorite read</p>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 rounded-lg border p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-lg">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
            
            {/* Genre Filter */}
            <div className="mb-6">
              <Label htmlFor="genre" className="text-base mb-2 block">Genre</Label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger id="genre" className="w-full">
                  <SelectValue placeholder="Select Genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Rating Filter */}
            <div className="mb-6">
              <Label htmlFor="rating" className="text-base mb-2 block">
                Minimum Rating: {minRating}/5
              </Label>
              <Slider
                id="rating"
                min={0}
                max={5}
                step={1}
                value={[minRating]}
                onValueChange={([value]) => setMinRating(value)}
                className="py-4"
              />
            </div>
            
            {/* Tags Filter */}
            <div className="mb-6">
              <Label className="text-base mb-2 block">Tags</Label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedTags.includes(tag) ? "bg-book-accent" : ""
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            {/* Sort Options */}
            <div>
              <Label htmlFor="sort" className="text-base mb-2 block">Sort By</Label>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger id="sort" className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating-desc">Highest Rating</SelectItem>
                  <SelectItem value="rating-asc">Lowest Rating</SelectItem>
                  <SelectItem value="year-desc">Newest</SelectItem>
                  <SelectItem value="year-asc">Oldest</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                  <SelectItem value="author">Author (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Results */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by title, author, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Results Count */}
            <p className="text-muted-foreground mb-6">
              Found {sortedBooks.length} {sortedBooks.length === 1 ? 'book' : 'books'}
              {selectedGenre !== "All Genres" && ` in ${selectedGenre}`}
              {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
            </p>
            
            {sortedBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {sortedBooks.map((book) => (
                  <BookCard key={book.id} {...book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-book-paper rounded-lg">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-heading font-semibold mb-2">No books found</h2>
                <p className="text-muted-foreground mb-6">Try adjusting your filters</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
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

export default Discover;
