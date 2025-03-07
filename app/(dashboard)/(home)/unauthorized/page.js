// // pages/unauthorized.js or wherever you prefer to store your pages

// "use client";
// import { useRouter } from 'next/navigation';

// const Unauthorized = () => {
//   const router = useRouter();

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
//       <div style={{ maxWidth: '400px', textAlign: 'center', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff' }}>
//         <h1 style={{ color: '#dc3545' }}>Access Denied</h1>
//         <p>You do not have permission to view this page.</p>
//         <button onClick={() => router.back()} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
//           Go Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Unauthorized;



// "use client";
// import { useRouter } from 'next/navigation';

// const Unauthorized = () => {
//   const router = useRouter();

//   const handleGoBackTwoSteps = () => {
//     window.history.go(-2);
//   };

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
//       <div style={{ maxWidth: '400px', textAlign: 'center', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff' }}>
//         <h1 style={{ color: '#dc3545' }}>Access Denied</h1>
//         <p>You do not have permission to view this page.</p>
//         <button onClick={handleGoBackTwoSteps} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
//           Go Back Two Pages
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Unauthorized;



// "use client";
// import { useRouter } from 'next/navigation';
// // import styles from './Unauthorized.module.css';

// const Unauthorized = () => {
//   const router = useRouter();

//   const handleGoBackTwoSteps = () => {
//     window.history.go(-2);
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h1 className="title">Access Denied</h1>
//         <p>You do not have permission to view this page.</p>
//         <button onClick={handleGoBackTwoSteps} className="button">
//           Go Back Two Pages
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Unauthorized;





"use client";
import { useRouter } from 'next/navigation';
// import styles from './Unauthorized.module.css';

const Unauthorized = () => {
  const router = useRouter();

  const handleGoBackTwoSteps = () => {
    window.history.go(-2);
  };

  return (
    <div className="card">
      <h1 className="title">Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <button onClick={handleGoBackTwoSteps} className="button">
        Go Back Two Pages
      </button>
    </div>
  );
};

export default Unauthorized;
