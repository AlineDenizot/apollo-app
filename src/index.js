import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';

import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
});


const GET_LAUNCHES = gql`
  query Launches {
    launches (limit: 5){
        id
        launch_date_utc
        launch_success
        rocket {
          rocket_name
        }
        links {
          video_link
        }
        details
  }
}
`;

function Launches() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

    console.log(data)

    return data.launches.map((launch) => (
      <div key={launch.id}>
      <h2>Lancement du {launch["launch_date_utc"]}</h2>
      <p>{(launch.launch_success) ? "Réussite": "Echec" }</p>
      <p>Nom de la fusée : {launch.rocket['rocket_name']}</p>
      <p><a href="{launch.links['video_link']}">Pour voir ce lancement sur youtube</a></p>
      <p>Plus de détails : {launch.details}</p>
      </div >
    ));
}

function App() {
  return (
    <div>
      <h1>Exemple de 5 lancements 🚀</h2>
      <Launches />
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
