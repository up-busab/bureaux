#yes, its a makefile, get over it

DEPLOY = /usr/share/tomcat8/webapps

default: package

install: package
	cp -f bureau.war ${DEPLOY}

package: bureau.war

bureau.war:
	mvn package 

clean:
	rm -f bureau.war

cleaner: clean
	mvn clean
	rm -rf /client/target

sterile: cleaner
	rm -rf ./client/etc ./client/node_modules ./client/node
