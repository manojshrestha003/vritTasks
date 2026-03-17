"use client";

import { useEffect } from "react";
import { fetchUsers } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setUsers,
  setLoading,
  setError,
} from "@/redux/slices/userSlice";
import UserCard from "@/components/UserCard";

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { users, apiIsLoading, error } =
    useAppSelector((state) => state.users);

  useEffect(() => {
    async function load() {
      dispatch(setLoading(true));
      try {
        const data = await fetchUsers();
        dispatch(setUsers(data));
      } catch {
        dispatch(setError("Something went wrong"));
      } finally {
        dispatch(setLoading(false));
      }
    }
    load();
  }, [dispatch]);

  if (apiIsLoading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}