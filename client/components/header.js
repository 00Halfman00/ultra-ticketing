import Link from 'next/link';

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item" style={{ padding: '.5rem' }}>
          <Link className="navbar-brand" href={href}>
            {label}
          </Link>
        </li>
      );
    });

  return (
    <div className="d-flex flex-row  justify-content-between">
      <Link className="navbar-brand" href="/">
        GitTix
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </div>
  );
};
