import React, { useState } from 'react';

const photosData = [
  {
    id: 1,
    link: 'https://randomuser.me/api/portraits/men/27.jpg',
    rating: 4.5,
    author: '',
    date: '2023-06-24',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    link: 'https://randomuser.me/api/portraits/men/69.jpg',
    rating: 3.8,
    author: 'Jane Smith',
    date: '2023-06-23',
    details:
      'Nulla facilisi. Mauris consequat odio eu felis tempor, sit amet ultricies magna consequat.',
  },
  {
    id: 3,
    link: 'https://randomuser.me/api/portraits/women/7.jpg',
    rating: 2.8,
    author: 'Jane janet',
    date: '2023-02-21',
    details:
      'Nulla facilisi. Mauris consequat odio eu felis tempor, sit amet ultricies magna consequat.',
  },
  {
    id: 4,
    link: 'https://randomuser.me/api/portraits/women/40.jpg',
    rating: 4.9,
    author: 'Jane Kowalski',
    date: '2023-06-22',
    details:
      'Nulla facilisi. Mauris consequat odio eu felis tempor, sit amet ultricies magna consequat.',
  },
  // Add more photo objects here
];

function Gallery() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const currentPhoto = photosData[currentPhotoIndex];

  const handleRatingChange = (newRating) => {
    // Update the rating for the current photo
    const updatedPhotosData = [...photosData];
    updatedPhotosData[currentPhotoIndex].rating = newRating;
    // You can save the updatedPhotosData to a database or state management system

    // Force re-render by updating the state
    setCurrentPhotoIndex(currentPhotoIndex);
  };

  const handlePreviousPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex < photosData.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  return (
    <div>
      <img src={currentPhoto.link} alt="Current" />
      <div>
        <RatingStars
          rating={currentPhoto.rating}
          onChange={handleRatingChange}
        />
        <p>Average Rating: {currentPhoto.rating}</p>
        <a href="#">Details</a>
      </div>
      <div>
        <button
          onClick={handlePreviousPhoto}
          disabled={currentPhotoIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNextPhoto}
          disabled={currentPhotoIndex === photosData.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function RatingStars({ rating, onChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarHover = (starRating) => {
    setHoverRating(starRating);
  };

  const handleStarClick = (starRating) => {
    onChange(starRating);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const starClassName = i <= (hoverRating || rating) ? 'star filled' : 'star';
    stars.push(
      <span
        key={i}
        className={starClassName}
        onMouseEnter={() => handleStarHover(i)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => handleStarClick(i)}
      >
        &#9733;
      </span>
    );
  }

  return <div className="rating">{stars}</div>;
}

export default Gallery;
