import { useAppSelector } from '../../hooks/redux';
import { getError, getGitItems, getGitItemsCount, getIsLoading } from '../../store/gitReducer/selectors';
import { Pagination } from '../Pagination';
import { useMemo, useState } from 'react';
import { Card } from '../Card';
import styles from './list.module.scss'

const PageSize = 10;

export const List = () => {
  const {items, isLoading, error, total_count} = useAppSelector((state) => ({
    items: getGitItems(state),
    isLoading: getIsLoading(state),
    error: getError(state),
    total_count: getGitItemsCount(state)
  }))

 
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return items.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, items]);
  
  if (isLoading) {
    return <div className={styles.parent_message}><p className={styles.message}>Sarching...</p></div>
  }
  if (error === "Request failed with status code 422") {
    return <div className={styles.parent_message}><p className={styles.message}>Type something &uarr;</p></div>
  }
  if (error === "Request failed with status code 403") {
    return <div className={styles.parent_message}><p className={styles.message}>Охлади свой поиск - <p className={styles.error}>{error}</p></p></div>
  }
  if (error) {
    return <div className={styles.parent_message}><p className={styles.message}>{error}</p></div>
  }

  if (total_count === 0) {
    return <div className={styles.parent_message}><p className={styles.message}>Нука проверь что ты там начеркал</p></div>
  }
  
    return (
      <>
        <div className={styles.parent_cards}> 
            {currentTableData.map((el) => (
              <Card
              key={el.id}
              name={el.name}
              stargazers_count={el.stargazers_count}
              pushed_at={el.pushed_at}
              html_url={el.html_url}
              ownerLogin={el.owner.login}
            /> 
              ))}
        </div>
              <div className={styles.pagination}>
            <Pagination
              currentPage={currentPage}
              totalCount={items.length}
              pageSize={PageSize}
              onPageChange={setCurrentPage}
          />
      </div>
        </>
    );
};
