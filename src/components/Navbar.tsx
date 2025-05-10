
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Book, BookOpen, User } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-2 mr-4">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-book-navy" />
            <span className="font-heading font-bold text-xl hidden sm:inline-block">Bookshelf</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-center px-2">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <form action="/search" method="GET">
              <Input
                type="search"
                placeholder="Search books, authors, genres..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                name="q"
              />
            </form>
          </div>
        </div>
        
        <nav className="flex items-center gap-2">
          <Link to="/discover">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Book className="h-4 w-4 mr-2" />
              Discover
            </Button>
          </Link>
          <Link to="/my-books">
            <Button variant="ghost" size="sm">
              <Book className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">My Books</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
