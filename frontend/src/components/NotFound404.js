import React from "react";

const NotFound404 = ({location}) => {
    return(
        <div className="page-notFound">
            <h2>Страница по адресу <span>'{location.pathname}'</span> не найдена.</h2>
        </div>
    )
}

export default NotFound404;
