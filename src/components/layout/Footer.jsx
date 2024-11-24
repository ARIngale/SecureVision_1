export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2023 RBAC Dashboard. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-emerald-300 transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-300 transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}