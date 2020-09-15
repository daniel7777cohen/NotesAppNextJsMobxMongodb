import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <Link href="/">
          <a>Todo App</a>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
