import VocabApp from '../src/App';

export default function Home() {
  return (
    <>
      <VocabApp />
      <style jsx global>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background-color: #f0f4f8;
        }

        h1 {
          color: #333;
        }

        button {
          cursor: pointer;
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #0056b3;
        }

        select {
          cursor: pointer;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          transition: border-color 0.3s ease;
        }

        select:hover {
          border-color: #007bff;
        }

        .min-h-screen {
          min-height: 100vh;
        }

        .bg-gray-100 {
          background-color: #f0f4f8;
        }

        .py-8 {
          padding-top: 2rem;
          padding-bottom: 2rem;
        }

        .px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }

        .sm\\:px-6 {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .lg\\:px-8 {
          padding-left: 2rem;
          padding-right: 2rem;
        }

        .max-w-md {
          max-width: 28rem;
        }

        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }

        .text-center {
          text-align: center;
        }

        .text-3xl {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }

        .font-bold {
          font-weight: 700;
        }

        .mb-8 {
          margin-bottom: 2rem;
        }

        .mb-4 {
          margin-bottom: 1rem;
        }

        .text-right {
          text-align: right;
        }

        .bg-white {
          background-color: white;
        }

        .shadow-md {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .rounded {
          border-radius: 0.375rem;
        }

        .p-6 {
          padding: 1.5rem;
        }

        .text-2xl {
          font-size: 1.5rem;
          line-height: 2rem;
        }

        .text-xl {
          font-size: 1.25rem;
          line-height: 1.75rem;
        }

        .flex {
          display: flex;
        }

        .justify-between {
          justify-content: space-between;
        }
      `}</style>
    </>
  );
}

