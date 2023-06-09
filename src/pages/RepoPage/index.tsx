import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getRepo, getRepoLanguages } from "../../store/repoReducer/actions";
import {
  getError,
  getGitRepo,
  getIsLoading,
  getLanguage,
} from "../../store/repoReducer/selectors";
import styles from "./repo.module.scss";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
} as Intl.DateTimeFormatOptions;

export const Repo = () => {
  const { owner, name } = useParams();
  const dispatch = useAppDispatch();

  const { repo, language, isLoading, error } = useAppSelector((state) => ({
    repo: getGitRepo(state),
    language: getLanguage(state),
    isLoading: getIsLoading(state),
    error: getError(state),
  }));
  useEffect(() => {
    dispatch(getRepo({ owner, name }));
    dispatch(getRepoLanguages({ owner, name }));
  }, [dispatch, owner, name]); 

  const newName = name ? (name.length > 15 ? name.slice(0, 15) + '...' : name) : '';
  const formattedDate = new Date(repo.pushed_at).toLocaleDateString(
    "en-US",
    options
  );

  return (
    <div className={styles.block_all_page}>
      {isLoading ? (
        <p className={styles.message}>
          Ищем... ищем... такс такс что тут у нас ...
        </p>
      ) : error === "Request failed with status code 404" ? (
        <p className={styles.message}>
          Дружище, ты что-то попутал, такой репы не существует - 
          <p className={styles.error}>{error}</p>
        </p>
      ) : error === "Request failed with status code 403" ? (
        <p className={styles.message}>
          Охлади свои запросы  - 
          <p className={styles.error}>{error}</p>
        </p>
      ) : (
        <div className={styles.block_repo_description}>
          <div className={styles.main_info_owner}>
            <div>
              <h2>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={repo.html_url}
                  className={`${styles.link} ${styles.link_name}`}
                >
                  {newName}
                </a>
              </h2>
              <h4>
                by -  
                <a 
                  target="_blank"
                  rel="noreferrer"
                  href={repo.owner.html_url} 
                  className={styles.link}
                  >
                  {" "}{owner}
                </a>
              </h4>
            </div>
            <img
              className={styles.image}
              src={repo.owner.avatar_url}
              alt="user avatar"
            ></img>
          </div>
          <div className={styles.other_info_owner}>
            <p>
              <span className={styles.bold}>About repository</span> -{" "}
              {repo.description}
            </p>
            <p>
              <span className={styles.bold}>Stars at the repository</span> -{" "}
              {repo.stargazers_count}
            </p>
            <p>
              <span className={styles.bold}>Last commit</span> - {formattedDate}
            </p>
            <span className={styles.bold}>Languages used</span> -{" "}
            {Object.entries(language).map(([key]) => (
              <li key={key}>{key}</li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
