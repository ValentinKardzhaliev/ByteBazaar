import React, { useState, useContext } from "react";
import AuthContext from '../../contexts/AuthContext';
import { changeEmailUser } from "../../services/authService";
import "./ChangeEmail.css";

const ChangeEmail = () => {
    const { user } = useContext(AuthContext);
    const [newEmail, setNewEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const data = await changeEmailUser(user.token, newEmail);

            if (data.detail === "Email updated successfully.") {
                setMessage(data.detail);
            } else {
                setError(data.detail || "Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="email-change-page">
            <div className="email-change-wrapper">
                <h2>Change Email</h2>
                <form onSubmit={handleEmailChange}>
                    <div className="email-input-group">
                        <label htmlFor="newEmail">New Email:</label>
                        <input
                            type="email"
                            id="newEmail"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="email-change-button">Change Email</button>
                </form>
                {message && <p className="email-change-success">{message}</p>}
                {error && <p className="email-change-error">{error}</p>}
            </div>
        </div>
    );
};

export default ChangeEmail;
