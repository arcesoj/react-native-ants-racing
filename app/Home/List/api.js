import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

import Ant from './Model';

class AntApi {

  constructor() {
    this.client = new ApolloClient({
      uri: 'https://antserver-blocjgjbpw.now.sh/graphql'
    })
  }

  async getAllAntsList() {
    return this.client.query({
      query: gql`
        {
            ants {
                name,
                color
            }
        }
    `}).then(({ data }) => {
      const antList = this._transformAntEntityCollection(data.ants);
      return antList;
    });
  }

  _transformAntEntityCollection(data = []) {
    const antList = data.flatMap(ant => {
      const {name} = ant;
      const antObject = new Ant(name, 'not yet run', 0);
      return antObject;
    });
    return antList;
  }
}

export default AntApi;