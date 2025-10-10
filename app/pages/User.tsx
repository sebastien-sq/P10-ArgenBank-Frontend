import { use, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useFetchUserFirstName,
  useFetchUserLastName,
} from "~/hooks/useUserProfile";
import { isValidFirstName, isValidLastName } from "~/utils/validateForm";
import { updateUserProfile } from "~/slices/userSlice";
import { useFetchUserToken } from "~/hooks/useAuthenticated";

export default function User() {
  const dispatch = useDispatch();
  const token = useFetchUserToken();
  const [firstName, setFirstName] = useState(useFetchUserFirstName());
  const [pendingFirstName, setPendingFirstName] = useState(firstName);
  const [lastName, setLastName] = useState(useFetchUserLastName());
  const [pendingLastName, setPendingLastName] = useState(lastName);
  const [error, setError] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditProfile = async ({
    newFirstName,
    newLastName,
  }: {
    newFirstName: string;
    newLastName: string;
  }) => {
    try {
      setError(null);
      if (!isValidFirstName(newFirstName)) {
        throw new Error("Invalid first name");
      }
      if (!isValidLastName(newLastName)) {
        throw new Error("Invalid last name");
      }

      await dispatch(
        updateUserProfile({
          firstName: newFirstName,
          lastName: newLastName,
          token: token!,
        }) as any
      )
        .unwrap()
        .then(() => {
          setFirstName(newFirstName);
          setLastName(newLastName);
          setIsFormOpen(false);
        })
        .catch((err: Error) => {
          throw new Error(err.message || "Failed to update profile");
        });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="main bg-dark size-full">
      <div className="header p-4 w-full gap-2 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">
          Welcome back
          <br />
          {firstName} {lastName}!
        </h1>
        <button
          className="edit-button cursor-pointer"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          Edit Name
        </button>
      </div>
      {isFormOpen && (
        <form
          className="edit-form bg-white w-fit mx-auto mb-12 p-4 flex flex-col items-center justify-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditProfile({
              newFirstName: pendingFirstName!,
              newLastName: pendingLastName!,
            });
          }}
        >
          <div className="input-group flex flex-col items-start justify-start gap-1">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={pendingFirstName ?? ""}
              onChange={(e) => setPendingFirstName(e.target.value)}
              placeholder={"Robert"}
              className="border border-gray-300 p-2 rounded w-64"
            />
          </div>
          <div className="input-group flex flex-col items-start justify-start gap-1">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={pendingLastName ?? ""} 
              onChange={(e) => setPendingLastName(e.target.value)}
              placeholder={"Downey Jr"}
              className="border border-gray-300 p-2 rounded w-64"
            />
          </div>
          {error && <p className="error-message text-red-500">{error}</p>}
          <button type="submit" className="edit-button cursor-pointer">
            Modify
          </button>
        </form>
      )}
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </div>
  );
}
