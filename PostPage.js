import React, { useState } from 'react';
import { Container, Form, Button, Dropdown, Segment, Message, Grid } from 'semantic-ui-react';
import { db, storage } from '../firebase'; 

const PostPage = () => {
  const [postType, setPostType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleTypeChange = (e, { value }) => {
    setPostType(value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setUploading(true);
    let imageUrl = '';
    if (image) {
      const storageRef = storage.ref(`images/${image.name}`);
      await storageRef.put(image);
      imageUrl = await storageRef.getDownloadURL();
    }

    await db.collection('questions').add({
      type: postType,
      title,
      description,
      tags: tags.split(','), 
      imageUrl,
      timestamp: new Date()
    });

    setTitle('');
    setDescription('');
    setTags('');
    setImage(null);
    setSubmitted(true);
    setUploading(false);
  };

  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <h1>Create a New Post</h1>
            <Segment>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label>Post Type</label>
                  <Dropdown
                    placeholder='Select Post Type'
                    selection
                    options={[
                      { key: 'question', text: 'Question', value: 'question' },
                      { key: 'article', text: 'Article', value: 'article' },
                    ]}
                    onChange={handleTypeChange}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Title</label>
                  <input
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Description</label>
                  <textarea
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Tags (comma separated)</label>
                  <input
                    placeholder="Enter tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Upload Image</label>
                  <input type="file" onChange={handleImageChange} />
                </Form.Field>

                <Button type='submit' color='blue' fluid loading={uploading}>
                  Post
                </Button>
              </Form>
            </Segment>
            {submitted && (
              <Message
                success
                header='Post Submitted'
                content='Your post has been successfully submitted.'
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default PostPage;
