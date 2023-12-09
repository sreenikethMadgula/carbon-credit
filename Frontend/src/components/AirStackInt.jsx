
import React, { useState, useEffect } from 'react';
import { AirstackProvider, useQuery } from '@airstack/airstack-react';


const MyComponent = () => {

    const query = `
query MyQuery {
  Wallet(input: {identity: "vitalik.eth", blockchain: ethereum}) {
    socials {
      dappName
      profileName
    }
    addresses
  }
}
`;
    const { data, loading, error } = useQuery(query, {}, { cache: false });

    if (loading) {
        return (
            <div>
                <p>Loading...{data}</p>
            </div>
        );
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    {console.log(data)}
}

export default MyComponent;
