import $ from 'jquery';

function authMutation() {
  // GraphQL requires double-quoted strings in the query:
  return `
    mutation {
      authenticate(input: {email: "srffffv@double.trouble", password: "texasfloods"}) {
        jwtToken
      }
    }
  `
};

export default {
  authenticate(cb) {
    var query = authMutation();
    $.get("https://df3yrm54i8.execute-api.us-east-1.amazonaws.com/dev/graphql", {query: query}, function(response) {
      if (response.errors) {
        // handle errors
        cb.call();
      } else {
        // use response.data
        const token = "Bearer " + response.data.authenticate.jwtToken;
        localStorage.setItem('token',token);
        cb.call();
      }
    });
  },
}
