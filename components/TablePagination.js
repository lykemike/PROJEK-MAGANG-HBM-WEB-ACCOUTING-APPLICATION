import React from "react";
import { Pagination } from "react-bootstrap";

export default function TablePagination({ currentPage, lastIndex, onClickPage, onPrevChange, onNextChange, onLastPage, onFirstPage }) {
  function range(start, stop, step = 1, circularFill = false, map = (value) => value) {
    if (typeof stop === "undefined") {
      stop = start;
      start = 0;
    }

    if (step > 0 && start >= stop) {
      step = -step;
    }

    if (step < 0 && start <= stop) {
      return [];
    }

    let index = start;
    const result = [];

    if (circularFill) {
      const size = start + stop;
      for (index; step > 0 ? index < size : index > size; index += step) {
        result.push(map(index % stop));
      }
      return result;
    }

    for (index; step > 0 ? index < stop : index > stop; index += step) {
      result.push(map(index));
    }

    return result;
  }

  const handleLast = (lastIndex) => {
    let plus_five = currentPage + 5;
    if (plus_five > lastIndex) {
      return lastIndex;
    } else {
      return plus_five;
    }
  };

  return (
    <Pagination>
      <Pagination.First onClick={onFirstPage} />
      <Pagination.Prev onClick={onPrevChange} />
      {range(currentPage, handleLast(lastIndex) + 1).map((i) => (
        <Pagination.Item active={i === currentPage} onClick={() => onClickPage(i)}>
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={onNextChange} />
      <Pagination.Last onClick={onLastPage} />
    </Pagination>
  );
}
