export default function Contact() {
    return (
      <div className="max-w-xl mx-auto mt-10 space-y-6 text-center">
        <h1 className="text-3xl font-bold">Contact Brendan Jacobs</h1>
        <p className="text-secondary">
          Want to get in touch? Here's where you can find me:
        </p>
  
        <ul className="space-y-3 text-base text-primary dark:text-light text-left sm:text-center">
          <li>
            <strong>📞 Phone:</strong>{" "}
            <a
              href="tel:+27833892171"
              className="text-accent hover:underline"
            >
              +27 83 389 2171
            </a>
          </li>
          <li>
            <strong>📧 Email:</strong>{" "}
            <a
              href="mailto:brendan0jacobs@gmail.com"
              className="text-accent hover:underline"
            >
              brendan0jacobs@gmail.com
            </a>
          </li>
          <li>
            <strong>🐙 GitHub:</strong>{" "}
            <a
              href="https://github.com/bren182"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              @bren182
            </a>
          </li>
          <li>
            <strong>📺 YouTube:</strong>{" "}
            <a
              href="https://www.youtube.com/@bren182"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              @bren182
            </a>
          </li>
          <li>
            <strong>📚 Boot.dev:</strong>{" "}
            <a
              href="https://www.boot.dev/u/doge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              doge @ Boot.dev
            </a>
          </li>
        </ul>
      </div>
    );
  }
  