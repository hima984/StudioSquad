import { useEffect, useState } from "react";
import { auth } from "../firebase/config";

function TestFirebase() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    if (auth.currentUser) {
      setStatus("✅ Firebase Connected & User is Logged In");
    } else {
      setStatus("✅ Firebase is Connected Successfully!");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-50">
      <div className="text-center p-10 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Firebase Test</h1>
        <p className="text-lg text-green-600 font-medium">{status}</p>
        <p className="mt-4 text-sm text-gray-500">Project ID: authexample-da7d7</p>
      </div>
    </div>
  );
}

export default TestFirebase;