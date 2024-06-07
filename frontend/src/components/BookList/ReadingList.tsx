import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../graphql/queries";

interface ReadingListProps {}

const ReadingList: React.FC<ReadingListProps> = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.books.map((book: any) => (
          <li key={book.title}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Reading Level: {book.readingLevel}</p>
            <img
              src={`/${book.coverPhotoURL}`}
              alt={book.title}
              style={{ width: "300px"}}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingList;
