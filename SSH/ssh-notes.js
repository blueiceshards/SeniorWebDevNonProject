/* 
LESSON 1: INTRODUCTION

SSH, or secure shell, is a protocol. (other protocols: HTTP, FTP, HTTPS.) These are all ways to connect to computers and have a shared agreement of how to communicate. SSH is a way for machines to communicate with one another, between two computers over the internet. SSH allows users to share files as well as control and modify remote computers over the internet. It was created as a secure way of communication which encrypts all data so bad actors can't do bad things. 

What's the difference between HTTPS? Just like a web browser uses the HTTPS protocol to talk to servers and display websites, a shell needs a certain protocol to allow for data exchange or communication between two devices and not just the browser and the server. This is why SSH is called secure SHELL protocol. It's a protocol to use over shells. A shell, unlike the browser, allows you to talk to the OS. With SSH, I can use my terminal to talk to another computer. 

The significant advantage of SSH over its predecessors is the use of encrpytion to ensure the secure transfer of information between the host and the client. Host: remote server you're trying to access. Client: computer you are using to access the host. Bad guys can't read our messages because they are secure. 

LESSON 2: SSH COMMAND

Command line: ssh {user}@{host}
"ssh": informs your system that you want to open an encrypted secure shell connection.
"user": represents the account you want to access. for example you may want to access the root user === system administrator with complete rights to modify anything on the system. 
"host": the computer you want to access. can be an IP address or a domain name.
Once you hit enter, you are greeted with a remote terminal window. (and you can now modify the files on the remote computer)

You need SSH for the following: (1) connecting to github, clone, push, pull files from their servers to your computer. Github- you can use HTTPS or SSH. with HTTPS you need to enter your password all the time to clone a repository. you don't have to do that with SSH. (2) you can use it to remotely access a computer. if you are at home and you need to remotely access your computer at work, you can just SSH into it. (3) you have your production app somewhere on the server and you accidentally deleted your app, then you have to SSH into the server, get the project files to the server again, and go through all the steps of running npm install, build, start, to get the app back up and running. 

LESSON 3: SAVING THE DAY THROUGH SSH 

1. (Once you have established your SSH connection to the free DigitalOcean remote computer,) you want to run: "sudo apt-get install git". 

2. git clone *insert github SSH key, e.g. git@github.com:blueiceshards/SeniorWebDevNonProject.git*

3. permission denied (publickey) fatal: don't have SSH set up with github yet. 

4. git clone *github HTTPS key*

5. now, we have copied the github folder into our current directory. 

6. sudo apt-get install nodejs

7. npm install

8. if we have stuff on our home computer, and we want to SSH it over to our remote computer do the following:

9. cd stuff

10. rsync -av . root@ipaddressofubuntubox:~stuff

11. ssh root@ipaddressofubuntubox

12. we now have our stuff folder on the remote computer. 

LESSON 4: HOW SSH WORKS

There are 3 techniques used in SSH: symmetrical encryption, asymmetrical encryption, and hashing. Although a little complex, these come up whenever using HTTPS, blockchains, and so many other parts of programming. 

LESSON 5: SYMMETRICAL ENCRYPTION

Encryption is a way to hide or jumble up a piece of text that is impossible for someone to read without a way to decrypt it. it's a way to have secrets. 

Symmetric encryption uses one secret key for both encryption and decryption by both parties. One same key for both parties. With symmetric encryption, anyone who possesses the key can decrypt the message being transferred. SSH communicates through this shared key and how Andrei's computer talked with the DigitalOcean server. 

Problem: Anyone that has the key can decrypt the message. If Andrei is sending a password over to the another computer, if a bad guy happens to find the key or know the key, he can find out the password (decrypt the message using the same key). Hence, we need to get this key in a secure way so that other people don't know what this key is as well. This is done through a Key Exchange Algorithm, a secure way to exchange these keys without any bad actors intercepting it. What makes this algorithm particularly secure is the fact that they key is never actually transmitted between the client and the host. instead, the two computers share public pieces of data, and then manipulate it to independently calculate the secret key. So even if another machine captures the publicly shared data, it won't be able to calculate the key because the key exchagne algorithm is not known. 

The secret key is specific to each SSH session and is generated prior to client authentication. once the key has been generated betweeen these two parties, all packets moving between these two machines must be encrypted with this key. using symmetrical encryption, we are able to communicate in a private way butit looks like we need to do some sort of key exchange. 

LESSON 6: ASYMMETRICAL ENCRYPTION

Unlike symmetrical encryption, asymmetrical encryption uses two separate keys for encryption and decryption. Each computer has a different private key and a public key (so 4 different keys in total). Together, these keys form a public-private key pair. Public keys can be shared with anyone in the world and won't be a problem. But the private keys are absolute secrets that should never be shared with anybody. The private and public key pairs are linked to each other in terms of functionality. The private key cannot mathematically compute from the public key. This means that a message that is encrypted by a machine's public key can only be decrypted by the same machine's private key (one way relationship). 

How it works: Your friend sends his public key to your computer. if you want to send a message to your friend, you can encrypt the message using your friend's public key. When you friend's computer receives your encrypted message, he can use his private key to decrypt it and get your message. So you can send public keys to people (and bad people can grab the public keys), but because it's a one way relationship, this public key cannot decrypt its own message, nor can it decrypt anything encrypted by a private key. A public key can only encrypt something. This something can only be decrypted by its paired private key, that is never shared with anybody. 

The strength of this entire thing is that the private key is never released. 

most people think that SSH uses asymmetric encryption entirely, but this is not entirely true. this asymmetric form of encryption is only used during the key exchange algorithm of symmetric encryption (we need some way for symmetric encryption to generate the shared key without enterrng the public). what happens in SSH is that before they reinitiate a secure connection, both parties generate temporary public and private keys and share their respective keys to one another. at this point, we are able to get symmetric keys to exchange messages (with something called the Difiie Hellman Key Exchange - uses a jumble of information from public keys, private key, without ever exchanging the keys, each machine can generate the symmetric key from data from each computer. makes it possible for each party to combine their own private data with public data from other systems to arrive at an identical secret session key.) So now, we know how to generate a symmetric key using asymmetric encryption using the difiie hellman key exchange. this way, the symmetric key is going to stay private to us and never touch the public. 

This type of encryption is everywhere. To watch Udemy videos -> using Difiie Hellman Key Exchange. Use phone to do anything where it connects to a server -> uses Diffie Hellman Key exchange. As a developer, we should understand how these things work and not jsut on a surface level. 

"key exchange" but we don't actually exchange a key because it will be out in the public and we don't want that. we actually just share a piece of public variable such as our public keys, from each computer, and we generate the key separately in our own private space. 

LESSON 7: HASHING

SSH uses both symmetric and asymmetric encryption. since asymmetric encryption is more time consuming, most of the SSH connections use symmetric encryptions as we've discussed. asymmetric encryption is used only to share a public key and finally, using that key, that is symmetric encryption, for further communications so it's fast. once a secure symmetric connection has been established, the server uses the client's public key and generates a challenge, and transmits it to the client for authentification. if the client can successfully decrypt the message, then it means it holds the private key required for a connection, and the SSH session finally begins (secure tunnel for communication). Problem: bad guys can still sit in the middle and pretend to be the other person, and tamper with and modify the message if they somehow convince the client that they're the host and the host that they're the client, they can have key exchange between one another and info can flow through that middleman.

To solve one of these problems, use hashing, a form of cryptography used in secure shell connections (e.g. bcrypt to hash passwords) hash functions differ in that they're never meant to decrypt anything. they simply generate a unique value of a fixed length for each input that it gets, and they're one way function (no idea how to get from hash back to the message). using hashes, we can verify the authentication of the message. the bad person can't modify our message. this is done through hash based message authentication codes. Using a hash function, each message that is transmitted must contain something called a mac (a hash generated from the symmetric key, package sequence number, and message contents). combine these as an input into a hash function that outputs a hash string that means nothing. this message is sent to the host. now, the host can use their own symmetric key which is the same as the client's and the packet sequence number, which they both know, and because message was sent via SSH, they also have that message that was sent. they run it through the same hash function and calculate if the calculated figure matches what the client's hash was. if it matches, it means that the message was not tampered with. because if at anypoint, even one letter or a captialization was changed, this hash would be completely different. 

To establish SSH connection, e.g. through the command: ssh root@ipaddress, you need a password first. 

LESSON 8: HASHING

Once a secure symmetric communication has been established, the server needs to verify if the user has the rights to access it. if it wasn't the case, then anyone can connect into the server. 
1. D-H Key exchange
2. Arrive at symmetric key
3. Make sure of no funny business (through hashing)
4. Authenticate user 

Authenticate user - we want to make sure that whoever is trying to communicate with us is somebody that we want to communicate with and has the rights to communciate with us. because right now, anyone can type ssh root@ipaddress into their terminal and access Andrei's digitaloceans server. he needs to make sure that only he can access it. 

there are two ways that you can authenticate into a server: (1) what most SSH users use, is a password. the user is asked to enter a username followed by a password (password is smth digitalOceans emailed Andrei when he created his server) because this password is going to be sent after the SSH connection was made and both computer and server has the symmetric key, it's encrypted and safe to send. although passwords are encrypted, it's still not recommended to use passwords for secure connections because you can use a bot and brute force a whole bunch of passwords on this server esp if passwords are bad. (2) SSH into a server to get authenticated and avoid using passwords.

LESSON 9: SSH INTO A SERVER

Using SSH, we are going to use something called RSA which allows us to provide or prove the identity of a person without a password. 

cd ~/.ssh

open . 

You will realize it's just a folder like anywhere else on your computer, in his root directory, may contain: config, id_rsa, id_rsa.pub, key_backup/, known_hosts. You may not have id_rsa or id_rsa.pub, if so, you need to generate, a public and a private id_rsa key just for digitalOceans. you do this by: (remember to be in correct directory) ssh key-gen, which you should have on your computer if not you need to  download CLI. C = comment provides a new comment

ssh-keygen -C "test@gmail.com"
Generating public/private RSA key pair. 
Enter file in which to save the key (/Users/aneagoie/.ssh/id_rsa): /Users/aneagoie/.ssh/id_rsa_digitalocean
Enter passphrase (empty for no passphrase) Optional for additioanl security. 

Then, yo've generated a public and private RSA key pair. now you have id_rsa_digitalocean and id_rsa_digitalocean.pub. remember that .pub can be shared with anyone, but the non pub which is a private key, never share it with anybody. only you should keep it on your computer and never share it if not all your encryption will be useless. we can now copy this public key and share it with the digitialocean server with the following command that copies whatever is inside of the id_rsa_digitalocean.pub:

pbcopy < ~/.ssh/id_rsa_digitalocean_pub 

ssh root@digitaloceanIP

now, on the ubuntu digitaloceans server, we can:

mkdir .ssh

cd /.ssh

ls

(already, from digital oceans, we have authorized_keys, and known_hosts) if you dont see this on whatever server you have, you can just create the files).

nano to edit text inside of authorized keys

nano authorized_keys

copy and paste our public key pbcopy. command X, Y, Enter.

now, in authorized_keys, we have our public key. if you exit the digitaloceans SSH session and end the terminal session, you can:

ssh root@digitaloceanIP

if you have multiple id_rsa,

cd ~/.ssh

ssh-add ~/.ssh/id_rsa_digitalocean
Identity added

ssh root@digitaloceanIP
now, we have sshed into the box and can run any commands you want, also because our public key is in authorized_keys of the digitalocean server. 

set up SSH keys with github - can add different keys for different computers that you want to access your account from. 

*/