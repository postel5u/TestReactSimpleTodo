/**
 * Created by debian on 22/03/17.
 */

var scopes = ['playlist-modify-private','user-read-private','user-read-birthdate','user-read-email', 'user-library-read','user-follow-read', 'playlist-read-private'];
Accounts.ui.config({'requestPermissions':{'spotify':scopes}});
