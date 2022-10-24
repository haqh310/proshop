import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, keyword = "", isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  let pathName = '/'
  if (isAdmin) {
    pathName = '/admin/products/'
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={{
              pathname: pathName,
              search: `?keyword=${keyword}&page=${x + 1}`,
            }}
            activeClassName={x + 1 === page ? "active" : ""}
          >
            <Pagination.Item>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
