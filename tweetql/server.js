import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";
let tweets = [
  {
    id: "1",
    text: "hello 1",
    userId: "1",
  },
  {
    id: "2",
    text: "hello 2",
    userId: "2",
  },
];

let users = [
  {
    id: "1",
    firstName: "a",
    lastName: "b",
  },
  {
    id: "2",
    firstName: "jjj",
    lastName: "fff",
  },
];

const typeDefs = gql`
  """
  User에 대한 설명
  """
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    """
    Is the sum of firstName+lastName
    """
    fullName: String!
  }
  """
  Tweet object represents a resource for a Tweet
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    allMovies: [Movie!]!
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    movie(id: String!): Movie
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    """
    Deletes a Tweets if found, else returns false
    """
    deleteTweet(id: ID!): Boolean!
  }
  type movie {
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    title_english: String!
    title_long: String!
    slug: String!
    year: Int!
    rating: Float!
    runtime: Float!
    genres: [String]!
    summary: String
    description_full: String!
    synopsis: String
    yt_trailer_code: String!
    language: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_image: String!
    large_cover_image: String!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      return users;
    },
    allMovies() {
      return fetch("https://yts.mx/api/v2/list_movies.json", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((json) => json.data.movies);
    },
    movie(_, { id }) {
      return fetch(
        `https://yts.torrentbay.net/api/v2/movie_details.json?movie_id=${id}`
      )
        .then((r) => r.json())
        .then((json) => json.data.movie);
    },

  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;

      tweets = tweets.filter((tweet) => tweet.id !== id);

      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName}${lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      const result = users.find((user) => user.id === userId);
      if (!result) {
        console.log("userID가 없습니다.");
        return null;
      }
      return result;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
