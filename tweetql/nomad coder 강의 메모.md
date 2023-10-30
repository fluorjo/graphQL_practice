- 4-0. package.json에서 type을 module로 해줘야 import 를 할 수 있다. 아니면 함수 쓰고 require를 써줘야 한다. 

- 4-1.
  - graphql은 많은 type의 집합. 

  - 서버한테 서버에 있는 데이터의 타입을 설명해줘야 함.
  
  - eof = end of file 
  
  - "type Query" 작성은 필수. 
  이 안에 있어야 사용자가 request할 수 있다.
  - query란 get request를 만드는 거라 할 수 있음.
  - 이름 꼭 저것 대로 해줘야 함.

  - 4-2.
    - scalar type은 graphql에 내장돼 있는, 기본적으로 제공되는 것. 
    - mutation type에는 유저가 보낸 데이터로 변화시키는 동작들을 모두 넣는다. 
    - postTweet(text:String):Tweet
    <- 유저가 텍스트와 userid 를 보내면 새로운 Tweet를 유저한테 준다. 
    - opertaion에 아무 것도 안 적으면 기본적으로 query.
- 4-4
  - 느낌표를 붙이면 non-nullable field.

- 4-6 
  - GraphQL에서 Resolver는 쿼리의 각 필드에 대한 데이터를 제공하는 함수이다. Resolver는 GraphQL 서버에서 데이터를 가져오는 데 사용되며, 클라이언트가 요청한 필드의 값을 반환한다.

  즉 사용자가 필드를 청했을 때 실제로 호출되는 함수. 
  - root는 항상 resolver function의 첫 번째 argument
  
  - 사용자가 arguments를 보낼 때 그것들은 resolver functions의 두 번째 argument가 된다. 
- 4-7
  - 배열에서 삭제 방법 : 필터로 삭제하고자 하는 것의 id만 제외하고 남는 것들로 새로 배열을 정리. 