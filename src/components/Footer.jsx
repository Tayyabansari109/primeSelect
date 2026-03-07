import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()

  return (
    <footer className="py2 color footer">
        <div className="container" >
            <div className="row" >
                <div className="col" >
                    <p className="mb-0 text-center text-muted">&copy; {year}. All Rights Reserved.</p>
                    <h6 className="text-center text-muted">Developed by Tayyab Ansari</h6>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer