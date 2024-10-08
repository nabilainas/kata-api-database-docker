FROM prom/prometheus

ARG TARGET

COPY prometheus.template.yml /etc/prometheus/prometheus.template.yml

RUN mkdir -p /prometheus && \
    TARGET=${TARGET} envsubst < /etc/prometheus/prometheus.template.yml > /etc/prometheus/prometheus.yml

CMD ["prometheus", "--config.file=/etc/prometheus/prometheus.yml", "--storage.tsdb.path=/prometheus"]

EXPOSE 9090
