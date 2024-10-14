FROM prom/prometheus

COPY prometheus.yml /etc/prometheus/prometheus.yml

CMD ["prometheus", "--config.file=/etc/prometheus/prometheus.yml", "--storage.tsdb.path=/prometheus"]

EXPOSE 9090
