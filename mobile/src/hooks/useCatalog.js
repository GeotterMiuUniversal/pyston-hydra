import { useEffect, useState, useCallback } from 'react';
import { loadCatalog, getCachedCatalog } from '../services/catalogApi';

export default function useCatalog() {
  const [catalog, setCatalog] = useState(getCachedCatalog());
  const [loading, setLoading] = useState(!getCachedCatalog());

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await loadCatalog({ force: true });
    setCatalog(data);
    setLoading(false);
    return data;
  }, []);

  useEffect(() => {
    let alive = true;
    loadCatalog().then((data) => {
      if (!alive) return;
      setCatalog(data);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  return { catalog, loading, refresh };
}