const posts = [
    {
      id: 'post1',
      title: 'The Importance of a Balanced Diet',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=150&q=80',
      excerpt: 'Eating a balanced diet is crucial for maintaining good health...',
      content: 'Eating a balanced diet is crucial for maintaining good health. It provides the essential nutrients your body needs to function properly, boosts your immune system, and helps in managing weight effectively.',
      date: 'May 23, 2025'
    },
    {
      id: 'post2',
      title: 'Benefits of Regular Exercise',
      image: '../images/exercise.jpg',
      excerpt: 'Regular physical activity helps improve cardiovascular health...',
      content: 'Regular physical activity helps improve cardiovascular health, strengthens muscles, boosts mood, and reduces the risk of chronic diseases. Aim for at least 30 minutes of moderate exercise most days of the week.',
      date: 'May 20, 2025'
    },
    {
      id: 'post3',
      title: 'Why Quality Sleep Matters',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80',
      excerpt: 'Quality sleep is essential for mental and physical well-being...',
      content: 'Quality sleep is essential for mental and physical well-being. It supports brain function, improves concentration, and helps repair the body. Adults should aim for 7-9 hours of restful sleep each night.',
      date: 'May 18, 2025'
    }
  ];

  const container = document.getElementById('postsContainer');

  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    postDiv.innerHTML = `
      <a href="post.html?id=${post.id}">
        <img src="${post.image}" alt="${post.title}">
        <div class="post-content">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-excerpt">${post.excerpt}</p>
          <small>${post.date}</small>
        </div>
      </a>
    `;

    container.appendChild(postDiv);
  });