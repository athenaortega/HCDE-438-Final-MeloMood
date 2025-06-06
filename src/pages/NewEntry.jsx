const addEntry = (entry) => {
  setEntries((prevEntries) => [entry, ...prevEntries]);
};

useEffect(() => {
  const fetchEntries = async () => {
    if (!user) return;
    const q = query(collection(db, "journalEntries"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const entriesList = querySnapshot.docs.map((doc) => doc.data());
    setEntries(entriesList);
  };

  fetchEntries();
}, [user]);
