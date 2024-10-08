FROM prom/prometheus

COPY prometheus.template.yml /etc/prometheus/prometheus.template.yml

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 9090
