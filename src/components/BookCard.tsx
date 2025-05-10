
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  genre?: string;
}

const BookCard = ({ id, title, author, coverUrl, rating, genre }: BookCardProps) => {
  return (
    <Link to={`/book/${id}`}>
      <Card className="overflow-hidden h-full book-hover">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <img
            src={coverUrl}
            alt={`Cover for ${title}`}
            className="object-cover w-full h-full"
          />
          {genre && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-xs">
                {genre}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-base font-semibold line-clamp-1 mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{author}</p>
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < rating ? 'text-book-gold' : 'text-muted'}`}>
                  ★
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
