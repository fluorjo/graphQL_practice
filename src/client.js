import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

//1.아폴로 클라이언트 생성
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

//2.이 쿼리를 실행 중인 localhost:4000으로 전송
client
.query({
    query: gql`
      {
        allMovies {
          title
        }
      }
    `,
  })
//3. 데이터 도착 후 콘솔에 출력.
  .then((data) => console.log(data));

export default client;
