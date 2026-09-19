import React from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h1 className="page-title">Profile</h1>
      <p className="page-subtitle">Your BookNest account details.</p>

      <div className="card profile-card">
        <div className="profile-row">
          <span>Name</span>
          <strong>{user.name}</strong>
        </div>
        <div className="profile-row">
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>
        <div className="profile-row">
          <span>Role</span>
          <strong style={{ textTransform: "capitalize" }}>{user.role}</strong>
        </div>
      </div>
    </div>
  );
}
