import { ApolloClient, InMemoryCache,  } from "@apollo/client";

//1.아폴로 클라이언트 생성
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});


export default client;
