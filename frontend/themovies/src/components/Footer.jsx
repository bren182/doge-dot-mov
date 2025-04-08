export default function Footer() {
    return (
      <footer className="text-center text-sm py-6 bg-light dark:bg-primary-dark border-t border-secondary/20">
        <p className="text-secondary dark:text-light">
          This project uses the{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            TMDB API
          </a>{" "}
          but is not endorsed or certified by TMDB.
        </p>
        <div className="flex justify-center mt-2">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="TMDB Logo"
            className="h-8 filter dark:brightness-75"
          />
        </div>
      </footer>
    );
  }
  

  