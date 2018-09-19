#!/bin/sh

scp -i ~/.ssh/ghost.pem ubuntu@ec2-18-212-57-223.compute-1.amazonaws.com:~/mtbva.sql ./;
mysql -uroot -psK84life mtbva < ./mtbva.sql;