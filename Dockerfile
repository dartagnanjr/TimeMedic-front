FROM debian:latest
RUN apt update
RUN apt install zsh -y
RUN apt install net-tools iproute2 wget curl vim nodejs -y 
RUN apt install git -y
RUN apt install ncat -y
RUN sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
RUN mkdir -p /app
WORKDIR /app
CMD [ "/bin/bash" ]
