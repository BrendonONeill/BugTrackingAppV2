function Footer() {
  return (
    <footer>
      <div className="footer-project">
    <img src="/logo.png" width={50} height={50} alt="" /><p>Bug Tracking App</p>
      </div>
      <div className="footer-social">
    <ul>
      <li><a href="https://github.com/BrendonONeill" target="_blank"><img src="/github.svg" width={15} height={15} alt="" /> GitHub</a></li>
      <li><a href="https://www.linkedin.com/in/brendon-o-neill/" target="_blank"><img src="/linkedin.svg" width={15} height={15} alt="" /> LinkedIn</a></li>
      <li><a href="https://brendononeill.github.io/Portfolio-Revamp/" target="_blank"><img src="/port.svg" width={15} height={15} alt="" /> Portfolio</a></li>
    </ul>
      </div>
      <div className="footer-name">
    <p>Brendon O'Neill &copy; 2023</p>
      </div>
    </footer>
  )
}

export default Footer