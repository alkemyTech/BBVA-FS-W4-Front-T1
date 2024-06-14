import React, { useState } from "react";
import { getAccountDetaileByCBU } from "../../api/Account";
const Account = () => {
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAccountDetaileByCBU();
        setAccountData(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [loading]);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <BankAccountCard accountData={accountData} />
        </>
      )}
    </Container>
  );
};

export default Account;
