import React from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Import social icons from react-icons

/**
 * SocialButtonsComponent
 * 
 * This component provides buttons for social login options:
 * - Google Login
 * - Facebook Login
 * 
 * Features:
 * - Includes icons for visual branding.
 * - Hover and click effects for better interactivity.
 * - Flexible design to integrate seamlessly into authentication forms.
 */
const SocialButtonsComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px", // Add space between buttons
        marginTop: "20px",
      }}
    >
      {/* Google Button */}
      <button
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#fff", // White background
          color: "#3B3DBF", // Blue text color
          border: "1px solid #3B3DBF", // Blue border
          borderRadius: "25px", // Rounded corners
          cursor: "pointer",
          fontSize: "16px", // Font size
          fontWeight: "500", // Medium weight
          gap: "8px", // Space between icon and text
          transition: "all 0.3s ease", // Smooth transition for hover effect
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#3B3DBF"; // Change background to blue
          e.target.style.color = "#fff"; // Change text color to white
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#fff"; // Revert to white background
          e.target.style.color = "#3B3DBF"; // Revert to blue text
        }}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")} // Scale down on click
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")} // Scale back to normal
      >
        <FaGoogle size={18} /> {/* Google Icon with its default color */}
        Google
      </button>

      {/* Facebook Button */}
      <button
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#fff", // White background
          color: "#3B3DBF", // Blue text color
          border: "1px solid #3B3DBF", // Blue border
          borderRadius: "25px", // Rounded corners
          cursor: "pointer",
          fontSize: "16px", // Font size
          fontWeight: "500", // Medium weight
          gap: "8px", // Space between icon and text
          transition: "all 0.3s ease", // Smooth transition for hover effect
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#3B3DBF"; // Change background to blue
          e.target.style.color = "#fff"; // Change text color to white
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#fff"; // Revert to white background
          e.target.style.color = "#3B3DBF"; // Revert to blue text
        }}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")} // Scale down on click
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")} // Scale back to normal
      >
        <FaFacebook size={18} /> {/* Facebook Icon with its default color */}
        Facebook
      </button>
    </div>
  );
};

export default SocialButtonsComponent;
