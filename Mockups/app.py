from flask import Flask, render_template, request
from pusher import Pusher

app = Flask(__name__)
pusher = Pusher(app_id=u'835900', key=u'e3412dad9232d73e7e37', secret=u'637a314baf4cd55a5499', cluster=u'mt1')

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/dashboard')
def dashboard():
	return render_template('dashboard.html')

@app.route('/orders', methods=['POST'])
def order():
	data = request.form
	pusher.trigger(u'order', u'place', {
		u'units': data['units']
	})
	return "units logged"

@app.route('/message', methods=['POST'])
def message():
	data = request.form
	pusher.trigger(u'message', u'send', {
		u'name': data['name'],
		u'message': data['message']
	})
	return "message sent"

@app.route('/customer', methods=['POST'])
def customer():
	data = request.form
	pusher.trigger(u'customer', u'add', {
		u'name': data['name'],
		u'age': data['age'],
		u'gender': data['gender'],
		u'place': data['place'],
		u'phone': data['phone']
	})
	return "customer added"

@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    media_files = []
    num_media = int(request.values.get("NumMedia"))
    
    number = request.form['From']
    message_body = request.form['Body']

    resp = MessagingResponse()
    
    if not num_media:
        character = request.values.get('Body')
        msg = resp.message(get_emojipedia_description(character))
    else:
        for idx in range(num_media):
            media_url = request.values.get(f'MediaUrl{idx}')
            mime_type = request.values.get(f'MediaContentType{idx}')
            media_files.append((media_url, mime_type))
            req = requests.get(media_url)
            file_extension = mimetypes.guess_extension(mime_type)
            media_sid = os.path.basename(urlparse(media_url).path)

            with open(f"app_data/{media_sid}{file_extension}", 'wb') as f:
                f.write(req.content)
            
            print(media_url)
        
        msg = resp.message("Tengo hambre.")
#        msg.media(GOOD_BOY_URL)

    return str(resp)

# Helper function to get an emoji's description
def get_emojipedia_description(character):
   # Get the Emojipedia page for this emoji
   character = character.lower()
   session = HTMLSession()
   response = session.get('https://emojipedia.org/' + character)
   print('https://emojipedia.org/' + character)

   # If we didn't find an emoji, say so
   if not response.ok:
       title = ''
       description = ''
       url = ''

       if 'hamburguesa' in character:
            title = 'Genial una hamburguesa'
            description = 'Es una buena opcion ' + '\U0001F604' + ' ' + ' la evaluacion promedio es' +  '\U0001F31F\U0001F31F\U0001F31F\U0001F31F\U0001F31F'
            url = 'https://www.animalgourmet.com/2019/02/11/las-12-mejores-hamburguesas-de-la-cdmx-una-para-cada-mes-del-ano/'
       if 'ensalada' in character:
            title = 'Es una mala idea'
            description = 'Deberias buscar otra opcion ' + '\U0001F612' 
       if 'carnitas' in character:
            title = 'Te recomiendo este platillo ️️☝'
            description = 'Estan muy ricas ' + '\U0001F612' 
            url = 'https://www.chilango.com/comida/carnitas-en-cdmx/'
       else:
            description = character + '\U0001F46B' 
                
        # And template it
       return render_template(
        'response.txt',
        title=title,
        description=description,
        url= url)
   else:
        return "No lo tomes asi, " + character

if __name__ == '__main__':
	app.run(debug=True)
